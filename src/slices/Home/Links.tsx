import info from "@/data/info.json";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export function Socials({ className, home=false }: { className?: string, home?: boolean }) {
  return (
    <>
      {info.socials.filter(social => !home ? social.url !== '/' : true).map((social) => (
        <a key={social.url} href={social.url} className={className}>
          <span>
            <DynamicIcon name={social.icon as IconName} className="w-5 h-5" />
          </span>
        </a>
      ))}
    </>
  );
}

export function Links() {
  return (
    <div className="flex flex-col gap-2 max-w-lg">
      {info.links.map((item) => (
        <Alert
          key={item.url}
          className="bg-zinc-800/90 hover:bg-zinc-700/90 border-0 cursor-pointer transition-all duration-300 py-2 px-6"
        >
          <a
            href={item.url}
            className={cn(
              "w-full items-center justify-start inline-flex gap-4 antialiased"
            )}
          >
            <span className="rounded-full p-1 flex justify-center items-center border border-border antialiased">
              <DynamicIcon
                name={item.icon as IconName}
                className="w-4 h-4"
                color="white"
              />
            </span>
            <div className="flex flex-col justify-start items-start">
              <AlertTitle className="text-neutral-100 w-full font-semibold text-lg text-nowrap">
                {item.title}
              </AlertTitle>
              <AlertDescription className="text-zinc-400 w-full text-md text-nowrap">
                {item.description}
              </AlertDescription>
            </div>
          </a>
        </Alert>
      ))}
    </div>
  );
}
