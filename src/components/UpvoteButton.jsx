import { motion } from "framer-motion";
import { IoArrowUpCircleOutline } from "react-icons/io5";


const UpvoteButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="btn flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700"
    >
      <IoArrowUpCircleOutline className="h-5 w-5" />
      <span>Upvote</span>
    </motion.button>
  );
};

export default UpvoteButton;
