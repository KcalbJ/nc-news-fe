
function ArticleCard() {
  return (
    <div className="mt-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">ARTICLE TITLE</h3>
        <p className="text-sm text-muted-foreground">Short description of the ARTICLE .</p>
      </div>
      <div className="p-6">
        <p>Content of the first article...</p>
      </div>
      <div className="flex items-center p-6">
        <button className="text-blue-500 hover:underline" href="#">
          Read More
        </button>
      </div>
    </div>
    
  )
}

export default ArticleCard