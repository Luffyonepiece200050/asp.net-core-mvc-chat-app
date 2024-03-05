using Microsoft.AspNetCore.SignalR;

namespace WebApplication1.Hubs
{
	public class ChatHub : Hub
	{
		public async Task Share(string user, string message)
		{

			await Clients.Caller.SendAsync("selfMsg", message);
			await Clients.Others.SendAsync("msgRcv", user, message);

		}

		public async Task ShareImage(string user, string imageData)
		{

			await Clients.Caller.SendAsync("imgRcv", user, imageData);
			await Clients.Others.SendAsync("imgRcv", user, imageData);

		}

		public override Task OnConnectedAsync()
		{
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception? exception)
		{
			return base.OnDisconnectedAsync(exception);
		}
	}
}
