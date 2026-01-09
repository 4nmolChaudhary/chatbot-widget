const PromptSuggestion = ({ suggestion, send }: { suggestion: string; send: (suggestion: string) => void }) => {
  return (
    <button onClick={() => send(suggestion)} className='w-fit bg-white shadow-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground inline-flex flex-1 items-center justify-center gap-1.5 rounded-md py-1 whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 px-2 h-6 text-sm cursor-pointer'>
      {suggestion}
    </button>
  )
}

export default PromptSuggestion
