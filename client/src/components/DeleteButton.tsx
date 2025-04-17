type Props = {
    id: string;
    onUpdate: () => void;
  };
  
  const DeleteButton = ({ id, onUpdate }: Props) => {
    const handleDelete = async () => {
      try {
        await fetch(`/api/complaints/${id}`, {
          method: 'DELETE',
        });
        onUpdate();
      } catch (err) {
        console.error('Error deleting complaint:', err);
      }
    };
  
    return (
      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline text-sm cursor-pointer"
      >
        Delete
      </button>
    );
  };
  
  export default DeleteButton;
  