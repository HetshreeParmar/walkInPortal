namespace backend.Models
{
    public class ProfessionalQualification
    {
        public ProfessionalQualification() {
            ProfessionalQualificationExpertTeches = new HashSet<ProfessionalQualificationExpertTech>();
            ProfessionalQualificationFamiliarTeches = new HashSet<ProfessionalQualificationFamiliarTech>();
        }
        public int ProfessionalQualificationId { get; set; }
        public int? ExpYear { get; set; }
        public decimal? CurrentCTC { get; set; }
        public decimal? ExpectedCTC { get; set;}
        public sbyte? CurrentlyOnNoticePeriod { get; set; }
        public DateTime? NoticeEnd { get; set; }
        public int? NoticePeriodLength { get; set; }
        public sbyte? AppearedZeusTest { get; set; }
        public string ZeusTestRole { get; set; }
        public int ApplicationTypeId { get; set; }
        public int UserId { get; set; }
        public string OtherExpertTechs { get; set; }
        public string OtherFamiliarTechs { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ApplicationType ApplicationType { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ProfessionalQualificationExpertTech> ProfessionalQualificationExpertTeches { get; set; }
        public virtual ICollection<ProfessionalQualificationFamiliarTech> ProfessionalQualificationFamiliarTeches { get; set; }
    }
}
