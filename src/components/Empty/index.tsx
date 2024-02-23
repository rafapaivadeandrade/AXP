import React from "react"

const Empty: React.FC = () => {
  return (
    <div className="py-20 flex flex-col items-center">
      <img
        className="mb-6 w-[82px] h-[68px]"
        src="/empty-wallet.png"
        alt="empty wallet"
      />
      <div className="flex flex-col gap-1">
        <p className="text-xl mx-1 text-stone text-TextBase font-bold">
          Nothing here yet...
        </p>
      </div>
    </div>
  )
}

export default Empty
