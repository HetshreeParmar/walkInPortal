namespace backend.Models
{
    public class ProfessionalQualificationExpertTech
    {
        public int TechId { get; set; }
        public int ProfessionalQualificationId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ProfessionalQualification ProfessionalQualification { get; set; }
        public virtual Technology Technology { get; set; }
    }
}
