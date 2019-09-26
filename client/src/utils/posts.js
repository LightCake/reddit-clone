import React from "react";
import axios from "axios";

// Convert timestamp to relative time
export const timeSince = date => {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  let seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType;
};

export const commentFormat = number => {
  if (number === "1") return "1 comment";
  if (number.length > 3) {
    const digitAfterDot = number[number.length - 3];
    return `${number.slice(0, -3)}${
      digitAfterDot !== "0" ? `.${digitAfterDot}` : ""
    }k comments`;
  }
  return number + " comments";
};

export const displayNewline = text => {
  return text
    .replace(/\n$/, "")
    .split("\n")
    .map((item, key) => (
      <React.Fragment key={key}>
        {item}
        <br />
      </React.Fragment>
    ));
};

export const fetchAllPosts = (subreddit = "") => {
  return axios.get(`/api/posts/all/${subreddit}`);
};

export const fetchPost = post_id => {
  return axios.get(`/api/posts/specific/${post_id}`);
};

export const addPost = data => {
  return axios.post("/api/posts/add", data);
};
