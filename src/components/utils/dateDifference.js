export const getTimeDifference = (dateString) => {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate - givenDate;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutesDifference < 60) {
    return `${minutesDifference} minutes ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference} hours ago`;
  } else {
    return `${daysDifference} days ago`;
  }
};
