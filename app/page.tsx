import BirthdayPage from "@/components/birthday_page/birthday";
import ComingSoonPage from "@/components/comingsoon_page/ComingSoon";
import { Story } from "@/components/Story";

type Props = {
  searchParams: Promise<{
    type?: string;
    person?: string;
    dob?: string;
    name?: string;
    [key: string]: string | undefined;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const type = params.type?.toLowerCase() ?? "";

  switch (type) {
    case "birthday":
      return (
        <BirthdayPage
          dob={params.dob}
          name={params.name}
        />
      );

    case "story":
      return <Story />
    default:
      return <ComingSoonPage />;
  }
}