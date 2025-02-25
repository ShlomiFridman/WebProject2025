import React from "react";
import { Review } from "@/utils/classes";
import { formatDate } from "@/utils/utils"

type ReviewsTableProps = {
  reviews: Review[];
};

const ReviewsTable: React.FC<ReviewsTableProps> = ({ reviews }) => {
  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-500 shadow-md rounded-lg p-4 m-4">
      {/* Table Header */}
      <div className="flex border-b-2 pb-2 mb-4">
        <h1 className="mr-4 text-lg font-semibold">
          <b>Score</b>
        </h1>
        <h1 className="flex-1 text-lg font-semibold">
          <b>Review</b>
        </h1>
        <h1 className="w-1/6 text-sm font-semibold text-center">
          <b>Date</b>
        </h1>
        <h1 className="w-1/6 text-sm font-semibold text-right">
          <b>Reviewer</b>
        </h1>
      </div>

      {/* Table Rows (Reviews) */}
      {sortedReviews.length ?
        sortedReviews.map((rev: Review, ind) => (
          <div key={ind} className="flex py-2 border-b">
            {/* Score */}
            <div className="mr-4 text-lg font-medium">
              {rev.score}/5
            </div>
            {/* Review Description */}
            <div className="ml-4 flex-1 text-lg">
              {rev.description}
            </div>
            {/* Date */}
            <div className="w-1/6 text-sm text-right">
              {formatDate(rev.date)}
            </div>
            {/* Username */}
            <div className="w-1/6 text-sm text-right">
              {rev.username}
            </div>
          </div>
        )) : <strong className="text-center">No reviews</strong>
      }
    </div>
  );
};

export default ReviewsTable;
