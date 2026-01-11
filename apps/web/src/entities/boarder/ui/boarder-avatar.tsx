import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface BoarderAvatarProps {
  firstName: string;
  lastName: string;
  image?: string | null;
  className?: string;
}

export function BoarderAvatar({ firstName, lastName, image, className }: BoarderAvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Avatar className={className}>
      {image && <AvatarImage src={image} alt={`${firstName} ${lastName}`} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
