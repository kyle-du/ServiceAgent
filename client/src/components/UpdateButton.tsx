
const apiURL = import.meta.env.VITE_API;

type Props = {
    id: string;
    currentStatus: string;
    onUpdate: () => void;
}

const UpdateButton = ({id, currentStatus, onUpdate} : Props) => {
    const newStatus = currentStatus === "Resolved" ? "Pending" : "Resolved";
    const handleClick = async () => {
        try {
            await fetch(`${apiURL}/api/complaints/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            onUpdate();
        } catch (err) {
            console.error("Error updating status: ", err);
        }
    };
    return (
        <button
          onClick={handleClick}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Toggle Status
        </button>
    );
}

export default UpdateButton;