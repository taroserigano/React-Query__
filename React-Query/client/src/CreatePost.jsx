import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: data => {
      // this will ensure that every time you add a new data (post), 
      // the screen refetch and show the newest post 
      queryClient.setQueryData(["posts", data.id], data)
      queryClient.invalidateQueries(["posts"], { exact: true })
      setCurrentPage(<Post id={data.id} />)
    },

    // optional, when mutation is successful, {hi: "Bye"} will send in as Context
    
    // onMutate: variables => { 
    //   retrn { hi: "Bye"} 
    // },

    // onSuccess: (data, variables, context) => { 
    // console.log(context) 
    //                                      } 
    
  })

  function handleSubmit(e) {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}
