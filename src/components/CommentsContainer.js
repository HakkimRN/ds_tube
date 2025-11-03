import React from "react";
import { USER_ICON } from "../utils/constants";

const commentsData = [
  {
    name: "Commenter 1",
    comment: "Lorem ipsum dolor",
    replies: [
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
    ],
  },
  {
    name: "Commenter 1",
    comment: "Lorem ipsum dolor",
    replies: [
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
    ],
  },
  {
    name: "Commenter 1",
    comment: "Lorem ipsum dolor",
    replies: [
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
    ],
  },
  {
    name: "Commenter 1",
    comment: "Lorem ipsum dolor",
    replies: [
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
    ],
  },
  {
    name: "Commenter 1",
    comment: "Lorem ipsum dolor",
    replies: [
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
      {
        name: "Commenter 1",
        comment: "Lorem ipsum dolor",
        replies: [],
      },
    ],
  },
];

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index} className="w-2/3">
      <Comment key={index} data={comment} />
      <div className="ml-7">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const Comment = ({ data }) => {
  const { name, comment, replies } = data;
  return (
    <div className="flex w-full rounded-2xl shadow-sm shadow-red-600 p-2 bg-black m-4">
      <img className="w-8 h-8 " alt="user" src={USER_ICON} />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

const CommentsContainer = () => {
  return (
    <div className="m-4 p-2 ">
      <h1 className="text-xl font-bold mb-2">Comments</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
