using System.ComponentModel.DataAnnotations;

namespace demoApplication.Model
{
    public class studentEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string Standard { get; set; }
        [Required]
        public string email { get; set; }
    }
}
