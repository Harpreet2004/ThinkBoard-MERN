import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false)
  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async() => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.notes);
        setRateLimited(false)
      } catch (error) {
        console.log("ERRORR::, fetching notes", error);
        if(error.response.status === 429){
          setRateLimited(true);
        }
        else{
          toast.error("Failed to load notes")
        }
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchNotes()
  },[])


  return (
    <div className="min-h-screen">
      <Navbar />
      
      {isRateLimited && <RateLimitedUi />}

      {!isRateLimited && (notes.length === 0) && <NotesNotFound />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isloading && <div>loading....</div> }

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              notes.map((note) => (
                  <NoteCard key={note._id} notes={note} setNotes={setNotes}/>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
