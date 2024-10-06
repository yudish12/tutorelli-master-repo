import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export function Heading({
  level,
  children,
  className,
  id,
}: React.PropsWithChildren<{
  level?: Level;
  className?: string;
  id?: string;
}>) {
  switch (level) {
    case 1:
      return (
        <h1
          className={cn(
            `scroll-m-20 font-heading text-[2.75rem] leading-[60px] font-extrabold tracking-normal dark:text-white text-blue`,
            className
          )}
          id={id}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={cn(
            `scroll-m-20 pb-2 font-heading text-4xl font-bold tracking-tight transition-colors first:mt-0 text-center text-blue`,
            className
          )}
          id={id}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={cn(
            "scroll-m-20 font-heading text-3xl font-semibold tracking-tight text-blue",
            className
          )}
          id={id}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={cn(
            "scroll-m-20 font-heading text-2xl font-semibold tracking-tight text-blue",
            className
          )}
          id={id}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5
          className={cn(
            "scroll-m-20 font-heading text-xl font-normal text-blue",
            className
          )}
          id={id}
        >
          {children}
        </h5>
      );
    case 6:
      return (
        <h6
          className={cn(
            "scroll-m-20 font-heading text-lg font-normal text-blue",
            className
          )}
          id={id}
        >
          {children}
        </h6>
      );

    default:
      return <Heading level={1}>{children}</Heading>;
  }
}
