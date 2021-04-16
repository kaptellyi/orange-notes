export const preventWhiteSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { value } = e.target as HTMLInputElement;
  if (e.key === ' ' && value.trim() === '') e.preventDefault();
};
