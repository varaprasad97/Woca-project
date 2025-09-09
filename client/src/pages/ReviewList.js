import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Reviewcard from '../components/Reviewcard';

const ReviewList = () => {
  const { serviceId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(`/api/reviews/${serviceId}`);
      setReviews(data);

      if (data.length > 0) {
        const avg = data.reduce((acc, r) => acc + r.rating, 0) / data.length;
        setAverage(avg.toFixed(1));
      }
    };
    fetchReviews();
  }, [serviceId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Service Reviews</h2>
      <p className="text-md text-yellow-600 mb-4">⭐ Average Rating: {average} / 5</p>
      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => <Reviewcard key={r._id} review={r} />)
        )}
      </div>
    </div>
  );
};

export default ReviewList;

