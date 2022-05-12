import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label for="email">Email</label>
          <input name="email" type="email"/>
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'test@test.com' && password === 'password') {
      // mark this person as logged in
      req.session = { loggedIn: true };
      // redirect
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getlogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
