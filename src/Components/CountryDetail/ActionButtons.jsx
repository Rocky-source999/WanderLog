function ActionButtons({addToWishlist,markVisited,}) {
  
  return (
    <div className="space-y-4 mt-6">
      <button
        onClick={addToWishlist}
        className="w-full bg-orange-500 text-white py-3 rounded-lg">
        Add To Bucket List
      </button>
      <button
        onClick={markVisited}
        className="w-full bg-teal-600 text-white py-3 rounded-lg">
        Mark As Visited
      </button>
    </div>
  );
}

export default ActionButtons;