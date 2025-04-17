import { useEffect, useState } from 'react';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

type Complaint = {
  id: string;
  name: string;
  email: string;
  complaint: string;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Resolved'>('All');
    const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    const applyFilters = (data: Complaint[] = allComplaints) => {
        let filtered = data;
      
        if (filterStatus !== 'All') {
          filtered = filtered.filter(
            (c) => c.status === filterStatus
          );
        }
      
        setComplaints(filtered);
      };
    
    const fetchComplaints = async () => {
        try {
          const res = await fetch('/api/complaints');
          const data = await res.json();
          setAllComplaints(data);
          applyFilters(data);
        } catch (err) {
          console.error('Error fetching complaints:', err);
        } finally {
          setLoading(false);
        }
      };
    
    useEffect(() => {
      fetchComplaints();
    }, []);

    useEffect(() => {
        applyFilters();
      }, [filterStatus]);
    
    return (
    <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
    
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <table className="table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="w-2/6 px-4 py-3 text-left text-sm font-semibold text-gray-700">Complaint</th>
                <th className="w-1/6 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-4">
                    <span>Status</span>
                        <div className="flex gap-2">
                        {['All', 'Pending', 'Resolved'].map((status) => (
                            <button
                            key={status}
                            onClick={() => {
                                setFilterStatus(status as 'All' | 'Pending' | 'Resolved');
                                applyFilters();
                            }}
                            className={`px-3 py-1 text-sm rounded border ${
                                filterStatus === status
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                            >
                            {status}
                            </button>
                        ))}
                    </div>
                </div>
                </th>
                <th className="w-1/12 px-4 py-3"></th>
                <th className="w-1/12 px-4 py-3"></th>
            </tr>
            </thead>
    
            <tbody className="divide-y divide-gray-100">
                {/*
                    hard-coding pixels fixes header width issue when no rows exist
                */}
                {/* <tr className="invisible h-0"> */}
                    {/* <td className="w-[150px] px-4"></td>
                    <td className="w-[150px] px-4"></td>
                    <td className="w-[200px] px-4"></td>
                    <td className="w-[300px] px-4"></td>
                    <td className="w-[150px] px-4"></td>
                    <td className="w-[100px] px-4"></td>
                    <td className="w-[100px] px-4"></td> */}
                {/* </tr> */}
                <tr className="invisible h-0">
                    <td className="w-1/6 px-4"></td>
                    <td className="w-1/6 px-4"></td>
                    <td className="w-1/6 px-4"></td>
                    <td className="w-2/6 px-4"></td>
                    <td className="w-1/6 px-4"></td>
                    <td className="w-1/12 px-4"></td>
                    <td className="w-1/12 px-4"></td>
                </tr>
            {loading ? (
                <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                    Loading complaints...
                </td>
                </tr>
            ) : complaints.length === 0 ? (
                <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                    No complaints found.
                </td>
                </tr>
            ) : (
                complaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(c.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                    {c.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-sm break-words">
                    {c.complaint}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{c.status}</td>
                    <td className="px-4 py-3 text-sm">
                    <UpdateButton id={c.id} currentStatus={c.status} onUpdate={fetchComplaints} />
                    </td>
                    <td className="px-4 py-3 text-sm">
                    <DeleteButton id={c.id} onUpdate={fetchComplaints} />
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default AdminDashboard;