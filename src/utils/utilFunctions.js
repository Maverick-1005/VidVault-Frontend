export const getTimeDifference = (createdAt) => {
     const createdAtDate = new Date(createdAt);

     const currentDate = new Date();
 
     const timeDifference = currentDate.getTime() - createdAtDate.getTime();
 
     const seconds = Math.floor(timeDifference / 1000);
     const minutes = Math.floor(timeDifference / (1000 * 60));
     const hours = Math.floor(timeDifference / (1000 * 60 * 60));
     const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
 
     if (seconds < 60) return `${seconds} seconds ago`;
     if (minutes < 60) return `${minutes} minutes ago`;
     if (hours < 24) return `${hours} hours ago`;
     return `${days} days ago`;
}