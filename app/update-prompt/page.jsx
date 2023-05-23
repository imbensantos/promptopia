"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPrompt({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);


  const editPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) return alert("Prompt ID not found")

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag
        })
      });

      if(response.ok){
        router.push('/profile')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <Form
      handleSubmit={editPrompt}
      prompt={prompt}
      setPrompt={setPrompt}
      isSubmitting={isSubmitting}
      type="Edit"
    />
  );
}

export default EditPrompt;
