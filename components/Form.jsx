import Link from "next/link";

const Form = ({ handleSubmit, prompt, setPrompt, isSubmitting, type }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            onChange={(e) => setPrompt({ ...prompt, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            value={prompt.prompt}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">(#product, #development, #idea)</span>
          </span>
          <input
            className="form_input"
            onChange={(e) => setPrompt({ ...prompt, tag: e.target.value })}
            placeholder="#tag"
            required
            value={prompt.tag}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
