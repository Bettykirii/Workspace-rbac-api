import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface RefreshTokenAttributes {
  id: string;
  userId: string;
  tokenHash: string;
  revokedAt?: Date | null;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type RefreshTokenCreationAttributes = Optional<
  RefreshTokenAttributes,
  "id" | "revokedAt"
>;

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  public id!: string;
  public userId!: string;
  public tokenHash!: string;
  public revokedAt!: Date | null;
  public expiresAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    tokenHash: { type: DataTypes.STRING, allowNull: false },
    revokedAt: { type: DataTypes.DATE, allowNull: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "RefreshToken",
  }
);