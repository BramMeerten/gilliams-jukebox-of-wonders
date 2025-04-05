import { Music } from "@/components/music";
import { MusicTileRow } from "@/components/music-tile-row";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
    const tiles: Music[] = [
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
        {
            title: 'Festival Town', 
            videoId: "8u9ZC8WLIiU", 
            image: "https://i.ytimg.com/vi/8u9ZC8WLIiU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgVShKMA8=&rs=AOn4CLDg4vAzYaj9VRshjpqgrT1gZvkwhQ"
        },
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
        {
            title: 'Large City', 
            videoId: "ddMSMwKQkKI", 
            image: "https://i.ytimg.com/vi/ddMSMwKQkKI/hq720.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYciA-KEEwDw==&rs=AOn4CLC2xrWMTyJ_AuupbnOcPBcA29y3LA"
        },
    ];
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <MusicTileRow style={{width: '800px;'}} tiles={tiles} />
      </main>
    </div>
  );
}
