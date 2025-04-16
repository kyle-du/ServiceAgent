import { useEffect, useState } from 'react';
import UpdateButton from './UpdateButton';

type Complaint = {
  id: string;
  name: string;
  email: string;
  complaint: string;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaints');
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchComplaints();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Complaint</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {c.name || <span className="italic text-gray-400">Anonymous</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-sm break-words w-1/3">{c.complaint}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.status}</td>
                  <td className="px-4 py-3 text-sm">
                    <UpdateButton id={c.id} currentStatus={c.status} onUpdate={fetchComplaints}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;