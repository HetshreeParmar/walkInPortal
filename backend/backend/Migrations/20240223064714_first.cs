using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "application_types",
                columns: table => new
                {
                    application_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    application_type_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_application_types", x => x.application_type_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    location_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    location_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.location_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "qualifications",
                columns: table => new
                {
                    qualification_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    qualification_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_qualifications", x => x.qualification_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    role_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.role_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "slots",
                columns: table => new
                {
                    slot_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    from_time = table.Column<TimeSpan>(type: "time", nullable: false),
                    to_time = table.Column<TimeSpan>(type: "time", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_slots", x => x.slot_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "streams",
                columns: table => new
                {
                    stream_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    stream_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_streams", x => x.stream_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "techs",
                columns: table => new
                {
                    tech_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    tech_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_techs", x => x.tech_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    email = table.Column<string>(type: "varchar(255)", nullable: false),
                    password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.user_id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "colleges",
                columns: table => new
                {
                    college_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    college_name = table.Column<string>(type: "varchar(255)", nullable: false),
                    location_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_colleges", x => x.college_id);
                    table.ForeignKey(
                        name: "fk_colleges_locations",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "location_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    job_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    job_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    from_time = table.Column<DateTime>(type: "date", nullable: true),
                    to_time = table.Column<DateTime>(type: "date", nullable: true),
                    things_to_remember = table.Column<string>(type: "text", nullable: false),
                    location_id = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "datetime", nullable: false),
                    venue = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_jobs", x => x.job_id);
                    table.ForeignKey(
                        name: "fk_jobs_locations1",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "location_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "proqualification",
                columns: table => new
                {
                    proqualification_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    exp_year = table.Column<int>(type: "year", nullable: true),
                    current_ctc = table.Column<decimal>(type: "decimal(10,2)", precision: 10, nullable: true),
                    expected_ctc = table.Column<decimal>(type: "decimal(10,2)", precision: 10, nullable: true),
                    currently_on_notice_period = table.Column<sbyte>(type: "tinyint", nullable: true),
                    notice_end = table.Column<DateTime>(type: "date", nullable: true),
                    notice_period_length = table.Column<int>(type: "int", nullable: true),
                    appeared_zeus_test = table.Column<sbyte>(type: "tinyint", nullable: true),
                    zeus_test_role = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    application_type_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    other_expert_techs = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    other_familiar_techs = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proqualification", x => x.proqualification_id);
                    table.ForeignKey(
                        name: "fk_proqualification_application_types1",
                        column: x => x.application_type_id,
                        principalTable: "application_types",
                        principalColumn: "application_type_id");
                    table.ForeignKey(
                        name: "fk_proqualification_users1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "userassets",
                columns: table => new
                {
                    userasset_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    resume = table.Column<string>(type: "longtext", nullable: false),
                    profile_photo = table.Column<string>(type: "longtext", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userassets", x => x.userasset_id);
                    table.ForeignKey(
                        name: "fk_userassets_users1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "userdetails",
                columns: table => new
                {
                    userdetail_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    first_name = table.Column<string>(type: "varchar(45)", maxLength: 45, nullable: false),
                    last_name = table.Column<string>(type: "varchar(45)", maxLength: 45, nullable: false),
                    phone_no = table.Column<decimal>(type: "decimal(10,2)", precision: 10, nullable: false),
                    portfolio_url = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    referal_emp_name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    send_me_update = table.Column<sbyte>(type: "tinyint", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    countrycode = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userdetails", x => x.userdetail_id);
                    table.ForeignKey(
                        name: "fk_userdetails_users1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "edqualification",
                columns: table => new
                {
                    edqualification_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    percentage = table.Column<decimal>(type: "decimal(5,2)", precision: 5, nullable: true),
                    passing_year = table.Column<int>(type: "year", nullable: false),
                    qualification_id = table.Column<int>(type: "int", nullable: false),
                    stream_id = table.Column<int>(type: "int", nullable: false),
                    college_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    other_college = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    other_college_location = table.Column<string>(type: "varchar(45)", maxLength: 45, nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_edqualification", x => x.edqualification_id);
                    table.ForeignKey(
                        name: "fk_edqualification_colleges1",
                        column: x => x.college_id,
                        principalTable: "colleges",
                        principalColumn: "college_id");
                    table.ForeignKey(
                        name: "fk_edqualification_qualifications1",
                        column: x => x.qualification_id,
                        principalTable: "qualifications",
                        principalColumn: "qualification_id");
                    table.ForeignKey(
                        name: "fk_edqualification_streams1",
                        column: x => x.stream_id,
                        principalTable: "streams",
                        principalColumn: "stream_id");
                    table.ForeignKey(
                        name: "fk_edqualification_users1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "application",
                columns: table => new
                {
                    application_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    resume = table.Column<string>(type: "longtext", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    job_id = table.Column<int>(type: "int", nullable: false),
                    slot_id = table.Column<int>(type: "int", nullable: false),
                    hallticket = table.Column<string>(type: "longtext", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_application", x => x.application_id);
                    table.ForeignKey(
                        name: "fk_application_jobs1",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "job_id");
                    table.ForeignKey(
                        name: "fk_application_slots1",
                        column: x => x.slot_id,
                        principalTable: "slots",
                        principalColumn: "slot_id");
                    table.ForeignKey(
                        name: "fk_application_users1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "job_desc",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    desc_title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    job_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_desc", x => x.id);
                    table.ForeignKey(
                        name: "fk_job_desc_jobs1",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "job_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "job_roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    package = table.Column<decimal>(type: "decimal(10,2)", precision: 10, nullable: true),
                    job_id = table.Column<int>(type: "int", nullable: false),
                    role_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_roles", x => x.id);
                    table.ForeignKey(
                        name: "fk_job_roles_jobs1",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "job_id");
                    table.ForeignKey(
                        name: "fk_job_roles_roles1",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "role_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "job_slots",
                columns: table => new
                {
                    slot_id = table.Column<int>(type: "int", nullable: false),
                    job_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.slot_id, x.job_id });
                    table.ForeignKey(
                        name: "fk_slots_has_jobs_jobs1",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "job_id");
                    table.ForeignKey(
                        name: "fk_slots_has_jobs_slots1",
                        column: x => x.slot_id,
                        principalTable: "slots",
                        principalColumn: "slot_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "proqualification_experttechs",
                columns: table => new
                {
                    tech_id = table.Column<int>(type: "int", nullable: false),
                    proqualification_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.tech_id, x.proqualification_id });
                    table.ForeignKey(
                        name: "fk_techs_has_proqualification_proqualification1",
                        column: x => x.proqualification_id,
                        principalTable: "proqualification",
                        principalColumn: "proqualification_id");
                    table.ForeignKey(
                        name: "fk_techs_has_proqualification_techs1",
                        column: x => x.tech_id,
                        principalTable: "techs",
                        principalColumn: "tech_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "proqualification_familiartechs",
                columns: table => new
                {
                    tech_id = table.Column<int>(type: "int", nullable: false),
                    proqualification_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.tech_id, x.proqualification_id });
                    table.ForeignKey(
                        name: "fk_techs_has_proqualification_proqualification2",
                        column: x => x.proqualification_id,
                        principalTable: "proqualification",
                        principalColumn: "proqualification_id");
                    table.ForeignKey(
                        name: "fk_techs_has_proqualification_techs2",
                        column: x => x.tech_id,
                        principalTable: "techs",
                        principalColumn: "tech_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "userdetails_roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false),
                    userdetail_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.role_id, x.userdetail_id });
                    table.ForeignKey(
                        name: "fk_roles_has_userdetails_roles1",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "role_id");
                    table.ForeignKey(
                        name: "fk_roles_has_userdetails_userdetails1",
                        column: x => x.userdetail_id,
                        principalTable: "userdetails",
                        principalColumn: "userdetail_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "application_roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false),
                    application_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.role_id, x.application_id });
                    table.ForeignKey(
                        name: "fk_roles_has_application_application1",
                        column: x => x.application_id,
                        principalTable: "application",
                        principalColumn: "application_id");
                    table.ForeignKey(
                        name: "fk_roles_has_application_roles1",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "role_id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "job_roles_desc",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    desc_title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    roles_id = table.Column<int>(type: "int", nullable: false),
                    dt_created = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    dt_modified = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_job_roles_desc", x => x.id);
                    table.ForeignKey(
                        name: "fk_job_roles_desc_job_roles1",
                        column: x => x.roles_id,
                        principalTable: "job_roles",
                        principalColumn: "id");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "fk_application_jobs1_idx",
                table: "application",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "fk_application_slots1_idx",
                table: "application",
                column: "slot_id");

            migrationBuilder.CreateIndex(
                name: "fk_application_users1_idx",
                table: "application",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "fk_roles_has_application_application1_idx",
                table: "application_roles",
                column: "application_id");

            migrationBuilder.CreateIndex(
                name: "fk_roles_has_application_roles1_idx",
                table: "application_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "application_type_name_UNIQUE",
                table: "application_types",
                column: "application_type_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "college_name_UNIQUE",
                table: "colleges",
                column: "college_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "fk_colleges_locations_idx",
                table: "colleges",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "fk_edqualification_colleges1_idx",
                table: "edqualification",
                column: "college_id");

            migrationBuilder.CreateIndex(
                name: "fk_edqualification_qualifications1_idx",
                table: "edqualification",
                column: "qualification_id");

            migrationBuilder.CreateIndex(
                name: "fk_edqualification_streams1_idx",
                table: "edqualification",
                column: "stream_id");

            migrationBuilder.CreateIndex(
                name: "fk_edqualification_users1_idx",
                table: "edqualification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "fk_job_desc_jobs1_idx",
                table: "job_desc",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "fk_job_roles_jobs1_idx",
                table: "job_roles",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "fk_job_roles_roles1_idx",
                table: "job_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "fk_job_roles_desc_job_roles1_idx",
                table: "job_roles_desc",
                column: "roles_id");

            migrationBuilder.CreateIndex(
                name: "fk_slots_has_jobs_jobs1_idx",
                table: "job_slots",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "fk_slots_has_jobs_slots1_idx",
                table: "job_slots",
                column: "slot_id");

            migrationBuilder.CreateIndex(
                name: "fk_jobs_locations1_idx",
                table: "jobs",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "location_name_UNIQUE",
                table: "locations",
                column: "location_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "fk_proqualification_application_types1_idx",
                table: "proqualification",
                column: "application_type_id");

            migrationBuilder.CreateIndex(
                name: "fk_proqualification_users1_idx",
                table: "proqualification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "fk_techs_has_proqualification_proqualification1_idx",
                table: "proqualification_experttechs",
                column: "proqualification_id");

            migrationBuilder.CreateIndex(
                name: "fk_techs_has_proqualification_techs1_idx",
                table: "proqualification_experttechs",
                column: "tech_id");

            migrationBuilder.CreateIndex(
                name: "fk_techs_has_proqualification_proqualification2_idx",
                table: "proqualification_familiartechs",
                column: "proqualification_id");

            migrationBuilder.CreateIndex(
                name: "fk_techs_has_proqualification_techs2_idx",
                table: "proqualification_familiartechs",
                column: "tech_id");

            migrationBuilder.CreateIndex(
                name: "qualification_name_UNIQUE",
                table: "qualifications",
                column: "qualification_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "role_name_UNIQUE",
                table: "roles",
                column: "role_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "stream_name_UNIQUE",
                table: "streams",
                column: "stream_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "tech_name_UNIQUE",
                table: "techs",
                column: "tech_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "fk_userassets_users1_idx",
                table: "userassets",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "fk_userdetails_users1_idx",
                table: "userdetails",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "fk_roles_has_userdetails_roles1_idx",
                table: "userdetails_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "fk_roles_has_userdetails_userdetails1_idx",
                table: "userdetails_roles",
                column: "userdetail_id");

            migrationBuilder.CreateIndex(
                name: "email_UNIQUE",
                table: "users",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "application_roles");

            migrationBuilder.DropTable(
                name: "edqualification");

            migrationBuilder.DropTable(
                name: "job_desc");

            migrationBuilder.DropTable(
                name: "job_roles_desc");

            migrationBuilder.DropTable(
                name: "job_slots");

            migrationBuilder.DropTable(
                name: "proqualification_experttechs");

            migrationBuilder.DropTable(
                name: "proqualification_familiartechs");

            migrationBuilder.DropTable(
                name: "userassets");

            migrationBuilder.DropTable(
                name: "userdetails_roles");

            migrationBuilder.DropTable(
                name: "application");

            migrationBuilder.DropTable(
                name: "colleges");

            migrationBuilder.DropTable(
                name: "qualifications");

            migrationBuilder.DropTable(
                name: "streams");

            migrationBuilder.DropTable(
                name: "job_roles");

            migrationBuilder.DropTable(
                name: "proqualification");

            migrationBuilder.DropTable(
                name: "techs");

            migrationBuilder.DropTable(
                name: "userdetails");

            migrationBuilder.DropTable(
                name: "slots");

            migrationBuilder.DropTable(
                name: "jobs");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "application_types");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "locations");
        }
    }
}
