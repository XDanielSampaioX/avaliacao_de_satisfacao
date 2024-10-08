import { IconArrowBack, IconDots } from "@tabler/icons-react"
import Image from "next/image"

export default function cabecalho() {
    return (
        <>
            <div className="flex justify-between p-2 ">
                <IconArrowBack/>
                <IconDots/>
            </div>
            <div className="relative w-full h-28 object-contain">
                <Image src="/assets/universidade fortaleza.jpeg" alt={"universidade de fortaleza"} fill priority={true} />
            </div>
        </>
    )
};
