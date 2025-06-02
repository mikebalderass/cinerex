// src/seed/admin.seed.ts
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository, DataSource } from 'typeorm';

export const seedAdmin = async (dataSource: DataSource) => {
  const userRepository: Repository<User> = dataSource.getRepository(User);

  const existing = await userRepository.findOne({
    where: { userName: 'admin' },
  });

  if (existing) {
    console.log('🔹 Usuario admin ya existe');
    return;
  }

  const admin = userRepository.create({
    name: 'Administrador',
    userName: 'admin',
    userEmail: 'admin@cinerex.com',
    userPassword: bcrypt.hashSync('admin123', 5),
    userRole: ['Admin'],
  });

  await userRepository.save(admin);
  console.log('Usuario admin creado correctamente');
};
