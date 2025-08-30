import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function Comments({ data }: { data: any }) {
    const [comment, setComment] = useState("")

    const handlePostComment = () => {
        if (comment.trim()) {
            console.log("New comment:", comment)
            setComment("")
        }
    }

    return (
        <Dialog>
            {/* Trigger button */}
            <DialogTrigger className="px-4 py-2 text-white rounded-md bg-[#c70e0e]">
                Comments
            </DialogTrigger>

            <DialogContent className="max-w-2xl w-full h-[90vh] flex flex-col p-0 rounded-2xl shadow-xl overflow-hidden">

                {/* Fixed Header */}
                <DialogHeader className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-semibold">Comments Blog</DialogTitle>
                    <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <IoClose className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {/* Blog content */}
                    <div className="mb-4 border rounded-lg overflow-hidden">
                        <div className="h-40 overflow-hidden">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h3>
                            <p className="text-gray-600">{data.description}</p>
                        </div>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-4">
                        {data.comments && data.comments.length > 0 ? (
                            data.comments.map((comment: any, index: number) => (
                                <div key={index} className="border-b pb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                                            {comment.user?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="font-medium">{comment.user || "Anonymous"}</p>
                                            <p className="text-gray-600 text-sm">{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>

                {/* Fixed Footer with Comment Box */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4">
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment..."
                            rows={2}
                            className="w-full p-3 pr-10 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={handlePostComment}
                            disabled={!comment.trim()}
                            className="absolute right-2 bottom-2 p-1 text-blue-600 hover:text-blue-800 disabled:opacity-40"
                        >
                            <IoSend className="h-5 w-5" />
                        </button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

