import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { cn } from "@workspace/ui/lib/utils";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { SOCIALS, LINKS } from "@/constants";

export function Socials({
  className,
  home = false,
  text = false,
}: {
  className?: string;
  iconClassName?: string;
  home?: boolean;
  text?: boolean;
}) {
  return (
    <>
      {SOCIALS.filter((social) => (!home ? social.url !== "/" : true)).map(
        (social) => (
          <a
            key={social.url}
            className="cursor-pointer"
            href={social.url}
            target="_blank"
          >
            <span>
              {text ? (
                <span className={className}>{social.name}</span>
              ) : (
                <DynamicIcon
                  name={social.icon as IconName}
                  strokeWidth={1}
                  className={cn("size-5", className)}
                />
              )}
            </span>
          </a>
        )
      )}
    </>
  );
}

export function Links() {
  return (
    <div className="flex flex-col gap-2 max-w-lg">
      {LINKS.map((item) => (
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
