import { RefreshToken } from "../models/RefreshToken";
import { signAccessToken, signRefreshToken, hashToken } from "../utils/tokens";


export const login = async ( req: Request, res: Response) => {
    try{
        const { email,password } = req.body;

        const user = await User.findOne ({ where: { email }});
        if(!user) return res.status(401).json({ message : "Invalid credentials"});

        const ok = await bcrypt.compare(password,user.password );
        if(!ok) return res.status(401).json({ message: "Invlaid credentials"});

        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);

        const tokenHash = hashToken(refreshToken);
        const expiresAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        await RefreshToken.create({
            userId: user.id,
            tokenHash,
            expiresAt,

        });
        
    return res.json({ accessToken,RefreshToken});
}
catch(err) {
    return res.status(500).json({ message: "Server error"});
}
};