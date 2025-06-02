'use client'

type SpacingProps = {
   size: number;
}

export default function Spacing({ size }: SpacingProps) {
   return <>
      {Array.from({ length: size }, (_, i) => i + 1).map((count, index) => {
         return <br key={index} />
      })}
   </>
}
