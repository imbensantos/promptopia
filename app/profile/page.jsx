"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = (promptToEdit) => {
    router.push(`/update-prompt?id=${promptToEdit._id}`);
  };
 
  const handleDelete = async (promptToDelete) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(
          `api/prompt/${promptToDelete._id.toString()}`,
          {
            method: "DELETE",
          }
        );

        const filteredPrompts = prompts.filter(
          (prompt) => prompt._id !== promptToDelete._id
        );

        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
