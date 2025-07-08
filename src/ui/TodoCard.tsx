import React, { useEffect, useState } from "react";
import { updateTodoField } from "@/auth/nextjs/actions";
import { useParams } from "next/navigation";
import { getToDoById } from "@/auth/nextjs/actions";

export interface TodoCardProps {
  id: string,
  title: string;
  description: string;
  image: string;
  priority: string;
  status: string;
  createdOn: string;
}

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  image,
  priority: initialPriority,
  status: initialStatus,
  createdOn,
}) => {

  const [todoData, setTodoData] = useState<TodoCardProps | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await getToDoById(id);
      setTodoData(data as TodoCardProps);
    };
    fetchTodo();
  }, [id]);
  const [priority, setPriority] = useState(initialPriority);
  const [status, setStatus] = useState(initialStatus);
  const handlePriorityChange = async (newPriority: string) => {
    setPriority(newPriority);
    try {
      await updateTodoField(id, { priority: newPriority });
      console.log("Priority saved!");
    } catch (error) {
      console.error("Failed to save priority:", error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await updateTodoField(id, { status: newStatus });
      console.log("Status saved!");
    } catch (error) {
      console.error("Failed to save status:", error);
    }
  };
  return (
    <div className="relative p-2">
      <div className="bg-white w-full rounded-xl border shadow flex flex-col pl-10 pt-3 pr-10 pb-3">
        {/* Top: Title and description with image */}
        <div className="flex flex-row items-start gap-4">
          <div className="flex-1 w-2/3">
            <h2 className="font-bold text-base mb-1 ">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="w-1/3 h-3/4 flex-shrink-0 rounded-lg overflow-hidden mt-6">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row: Priority, Status, Created on */}
        <div className="flex flex-wrap flex-row items-center gap-y-1 mt-4 text-xs text-gray-500">
          <span className="basis-1/3">
            <strong className="text-black">Priority:</strong>{" "}
            <select
              className="text-blue-500 text-xs border border-gray-300 rounded p-0.5"
              value={priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </span>
          <span className="basis-1/3">
            <strong className="text-black">Status:</strong>{" "}
            <select
              className="text-red-500 text-xs border border-gray-300 rounded p-0.5"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </span>
          <span className="basis-1/3">{createdOn}</span>
        </div>
      </div>

      {/* Red circle indicator */}
      <input
        type="radio"
        name="radio-5"
        className="radio radio-secondary radio-xs absolute top-5 left-5 rounded-full"
      />
    </div>
  );
};

export default TodoCard;
