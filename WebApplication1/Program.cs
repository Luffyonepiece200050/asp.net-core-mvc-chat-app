using WebApplication1.Hubs;

namespace WebApplication1
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddControllersWithViews();




			builder.Services.AddSignalR(o =>
			{
				o.EnableDetailedErrors = true;
				o.MaximumReceiveMessageSize = 1 * 1024 * 1024; // 1 MB

			});

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (!app.Environment.IsDevelopment())
			{
				app.UseExceptionHandler("/Home/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
			app.MapHub<ChatHub>("/chathub");

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthorization();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller=Home}/{action=Chat}/{id?}");






			app.Run();
		}
	}
}
