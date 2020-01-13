using System.Web.Mvc;

namespace Principal.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public int Validar(string usuario, string contraseña)
        {
            int respuesta = 0;
            if(usuario == "admin" && contraseña == "admin")
            {
                Session["usuario"] = "admin";
                Session["contraseña"] = "admin";
                respuesta = 1;
            }
            else
            {
                respuesta = 0;
            }
            
            return respuesta;
        }

        public ActionResult Cerrar()
        {
            Session.Remove("usuario");
            Session.Remove("contraseña");
            return RedirectToAction("Index", "Login");
        }
    }
}