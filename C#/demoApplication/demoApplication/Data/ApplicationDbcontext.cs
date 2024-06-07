using demoApplication.Model;
using Microsoft.EntityFrameworkCore;

namespace demoApplication.Data
{
    public class ApplicationDbcontext:DbContext
    {
        public ApplicationDbcontext(DbContextOptions options):base(options) { 
        }

        public DbSet<studentEntity> studentRegister { get; set; }

    }
}
