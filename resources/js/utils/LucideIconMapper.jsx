import * as Icons from 'lucide-react';

export const getLucideIcon = (iconName) => {
  const Icon = Icons[iconName];
  return Icon ? <Icon size={20} /> : <Icons.CircleHelp size={20} />;
};
