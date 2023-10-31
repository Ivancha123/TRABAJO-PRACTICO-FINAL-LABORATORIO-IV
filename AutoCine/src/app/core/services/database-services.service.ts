import { Injectable } from '@angular/core';
import { MysqlService } from '@angular/mysql';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends MysqlService {

  constructor(private mysql: MysqlService) {
    super(mysql, {
      host: 'localhost',
      port: 3306,
      database: 'my_database',
      user: 'root',
      password: 'password',
    });
  }

  getUsers(): Observable<any[]> {
    return this.query('SELECT * FROM users');
  }

  addUser(user: any): Promise<void> {
    return this.insert('users', user);
  }

  updateUser(id: string, user: any): Promise<void> {
    return this.update('users', id, user);
  }

  deleteUser(id: string): Promise<void> {
    return this.delete('users', id);
  }

}
