import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getPromotions, PromotionProps } from "../api/promotions";

  
  export default async function Promotions() {
    const session = await getServerSession();
  
    if (!session) {
      redirect("/");
      return;
    }
  
    try {
      const { data } = await getPromotions();
      return (
        <div>
          <ul>
            {data.map((promotion: PromotionProps) => (
              <li key={promotion.id}>
                <h2>{promotion.title}</h2>
                <p>{promotion.description}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
      return <div>Error loading promotions</div>;
    }
  }
  