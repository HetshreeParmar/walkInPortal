﻿namespace backend.Models
{
    public class JobDesc
    {
        public int Id { get; set; }
        public string DescTitle { get; set; }
        public string Description { get; set; }
        public int JobId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual Job Job { get; set; }
    }
}
