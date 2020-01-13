using Principal.Filters;
using System.Web.Mvc;

namespace Principal.Controllers
{
    [Seguridad]
    public class VisitaController : Controller
    {
        // GET: Visita
        public ActionResult Index()
        {
            return View();
        }
    }
}