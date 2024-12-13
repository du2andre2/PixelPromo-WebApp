import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getPromotions, PromotionProps } from "../api/promotions";
import { getUserById } from "../api/users";
import PromotionCard from "../components/PromotionCard";

  
  export default async function Promotions() {
    const session = await getServerSession();
  
    if (!session) {
      redirect("/");
    }
  
    try {
      const { data: promotions } = await getPromotions();

    const promotionsWithUsers = await Promise.all(
      promotions.map(async (promotion: PromotionProps) => {
        if (!promotion.userId) {
          throw new Error("User ID is undefined");
        }
        const { data: user } = await getUserById(promotion.userId);
        return {
          ...promotion,
          user,
        };
      })
    );

    return (
      <div>
        <ul>
          {promotionsWithUsers.map(({ user, ...promotion }) => (
            <li key={promotion.id}>
              <PromotionCard promotion={promotion} user={user} />
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
  