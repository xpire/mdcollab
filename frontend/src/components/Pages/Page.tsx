import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -0 },
  exit: { opacity: 0, x: 0 },
};

type Props = {
  children: React.ReactNode;
};

const Page: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: "tween" }}
    >
      {children}
    </motion.div>
  );
};

export default Page;
