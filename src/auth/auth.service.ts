import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: passwordHash,
    });

    return {
      id: user._id,
      email: user.email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
    });

    return {
      access_token: accessToken,
    };
  }
}