"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

function ProfilePage({params}) {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();

      setPrompts(data);
    };

    if (params?.id) fetchPrompts();
  }, [params.id]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s 
      exceptional prompts and be inspired by the power of their imagination!`}
      data={prompts}
    />
  );
}

export default ProfilePage;
