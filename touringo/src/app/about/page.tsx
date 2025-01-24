import { myStyles } from '@/utils/styles';
import { ImageElement } from '@/utils/util_client';

export default function About() {
  const logoItems = [
    {
      title: "Next.js",
      src: "https://pulkitgangwar.gallerycdn.vsassets.io/extensions/pulkitgangwar/nextjs-snippets/1.0.2/1713018281951/Microsoft.VisualStudio.Services.Icons.Default",
      link: "https://nextjs.org",  // Added link
    },
    {
      title: "MongoDB Atlas",
      src: "https://static-00.iconduck.com/assets.00/mongodb-icon-256x256-nc3cxgbo.png",
      link: "https://www.mongodb.com/cloud/atlas",  // Added link
    },
    {
      title: "TailwindCSS",
      src: "https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/31/tailwind.png",
      link: "https://tailwindcss.com",  // Added link
    },
    {
      title: "React",
      src: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      link: "https://reactjs.org",  // Added link
    },
    {
      title: "Vercel",
      src: "https://develop.finki.ukim.mk/projects/Caessino/export/87614a539b5a6d95f9aee8012bfdef4edeeb2fb5/public/favicon-vercel.ico",
      link: "https://vercel.com",  // Added link
    },
    {
      title: "GitHub",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png",
      link: "https://github.com/ShlomiFridman/WebProject2025",  // GitHub link
    }
  ];

  return (
    <div className={myStyles.container_max_width}>
      <h1 className="text-3xl text-green-600 font-bold">About</h1>
      <p>TouRingo is a project for the Advanced Web Technologies Course at Braude College (Winter 2025).</p>
      <p>Made by Shlomi, Shahar, Omer, and Noam.</p>
      
      <h2 className="text-2xl text-green-600 font-bold">Subject</h2>
      <p><u><strong>Local Tourism Guide App:</strong></u> Develop an app that showcases local tourist attractions, restaurants, and cultural events. The app will include user reviews, navigation features, and event booking options.</p>

      <h2 className="text-2xl text-green-600 font-bold mt-6">Created Using</h2>
      <br/>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {logoItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <ImageElement
                src={item.src}
                title={`${item.title} logo`}
                className="w-20 h-20 mb-2"
              />
            </a>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
