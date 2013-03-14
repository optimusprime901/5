package com.example.paint1;

import android.os.Bundle;
import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.view.Menu;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;

public class MainActivity extends Activity {
	
	
	class RenderView extends View implements OnTouchListener{
		
		Paint paint;
		Canvas canvas;
		int drawX,drawY,prevX,prevY,startX,startY,stopX,stopY;
		 String tool;
		 boolean set=false;
		
		public RenderView(Context context) {
			super(context);
			init();
			
			// TODO Auto-generated constructor stub
		}
		
		
		
		public void init(){
			
			paint = new Paint();
			
			drawX = 0;
			drawY = 0;
			tool="line";
		}
		
		
		protected void onDraw(Canvas canvas2){
			
			canvas = canvas2;
			set=true;
			
		}



		
		public boolean onTouch(View view, MotionEvent e) {
			
			drawX = (int) e.getX();
			drawY = (int) e.getY();
			
			
			
			switch(e.getAction()){
			
			case MotionEvent.ACTION_DOWN:
				
				toolList(drawX,drawY,"down");
				break;
				
			case MotionEvent.ACTION_MOVE:
				toolList(drawX,drawY,"move");
				break;
			
			case MotionEvent.ACTION_UP:
				toolList(drawX,drawY,"up");
				break;
				
				
			
			}
			
			
			return false;
			
			
		}


		private void toolList(int drawX2, int drawY2, String event) {
			
			if(event=="down"){
				
			if(tool=="freeHand"){
				
				
				
				
			}
					
			if(tool=="strokeRectangle"){
				
			}
						
			if(tool=="fillRectangle"){
				
			}
							
			if(tool=="line"){
				startX = drawX2;
				startY = drawY2;
			}
								
			if(tool=="continousLines"){
				
			}
									
			if(tool=="strokeCircle"){
				
			}
										
			if(tool=="fillCircle"){
				
			}
											
			if(tool=="glowingPencil"){
				
			}
												
			if(tool=="eraser"){
				
			}
													
			if(tool=="spray"){
				
			}
														
		
					
				
				
			}
			
			
			
			
			
			
			
			
			
			
			
			if(event=="move"){
				
				if(tool=="freeHand"){
					
				}
						
				if(tool=="strokeRectangle"){
					
				}
							
				if(tool=="fillRectangle"){
					
				}
								
				if(tool=="line"){
					stopX = drawX2;
					stopY = drawY2;
					
					canvas.drawLine(startX, startY, stopX, stopY, paint);
				}
									
				if(tool=="continousLines"){
					
				}
										
				if(tool=="strokeCircle"){
					
				}
											
				if(tool=="fillCircle"){
					
				}
												
				if(tool=="glowingPencil"){
					
				}
													
				if(tool=="eraser"){
					
				}
														
				if(tool=="spray"){
					
				}
															
			
						
					
					
				}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			if(event=="up"){
				
				if(tool=="freeHand"){
					
				}
						
				if(tool=="strokeRectangle"){
					
				}
							
				if(tool=="fillRectangle"){
					
				}
								
				if(tool=="line"){
					
				}
									
				if(tool=="continousLines"){
					
				}
										
				if(tool=="strokeCircle"){
					
				}
											
				if(tool=="fillCircle"){
					
				}
												
				if(tool=="glowingPencil"){
					
				}
													
				if(tool=="eraser"){
					
				}
														
				if(tool=="spray"){
					
				}
															
			
						
					
					
				}
			
		}
		
		
		
		
		
		
		
	}
	
	
	
	
	

	
	
	
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//init();
		setContentView(new RenderView(this));
	}
	
	
 



	
	
	
	
	

	
}
