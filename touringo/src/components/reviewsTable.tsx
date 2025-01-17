import React from "react";
import { Review } from "@/utils/classes";

type ReviewsTableProps = {
  reviews: Review[];
};

const ReviewsTable: React.FC<ReviewsTableProps> = ({ reviews }) => {
  return (
    <div className="event-table">
      <div className="event-row flex items-center justify-between">
        <b></b>
        <h1 className="hidden sm:block pr-4"><b>Details</b></h1> {/* Hidden on small screens */}
        <h1 className="hidden sm:block pr-8"><b>Options</b></h1> {/* Hidden on small screens */}
      </div>
      {reviews.map((rev: Review, ind) => (
        <div key={ind}>{rev.score}/5 - {rev.description}</div>
      ))}
    </div>
  );
};

export default ReviewsTable;
